import { Request, NextFunction, Response } from 'express';
import { Repository, getRepository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotifications';

export abstract class BaseController<T> extends BaseNotification {

    private _repository: Repository<T>;
    private _onlyRootController: boolean = false;

    private _errorRoot: any =  {
        status: 401,
        errors: ['Você não está autorizado a executar esta funcionalidade']
    }

    constructor(entity: any, onlyRoot:boolean = false) {
        super();
        this._repository = getRepository<T>(entity);
        this._onlyRootController = onlyRoot;
    }

    private checkPermission(request: Request){
        // return (this._onlyRootController && !request.IsRoot);
        return false;
    }

    async all(request: Request, response: Response, next: NextFunction) {

        // if( this.checkPermission(request)) return this._errorRoot;

        return this._repository.find({
            where:{
                deleted: false
            }
        });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        if(this.checkPermission(request)) return this._errorRoot;
        
        var searchQuery = {
            where: {
                uid: request.params.id,
                deleted: false
            }
        }
        let _modelInDB =  await this._repository.findOne(searchQuery);
        console.log(_modelInDB);
        if(_modelInDB) {
           return _modelInDB;
        }else{
            return {
                status: 400,
                errors: ['Não foi possível encontrar objeto no banco de dados']
            }
        }
    }

    async save(model: any, request) {
   
        if(this.checkPermission(request)) return this._errorRoot;
        if (model.uid) {
            let _modelInDB = await this._repository.findOne(model.uid);
            if (_modelInDB) {
                Object.assign(_modelInDB, model);
            }
        }


        if (this.valid())
            return this._repository.save(model);
        else
            return {
                status: 400,
                errors: this.allNotifications
            }
    }

    async remove(request: Request) {
        if(this.checkPermission(request)) return this._errorRoot;
        let uid = request.params.id;
      let model: any = await this._repository.findOne(uid);
      if(model){
          model.deleted = true;
          return await this._repository.save(model);
      }else{
          return {
            status: 404,
            errors: [
                'Item não encontrado no banco de dados'
            ]
          }
      }
        
    }

    get repository(): Repository<T>{
        return this._repository;
    }

}