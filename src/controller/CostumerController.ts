import { Costumer } from "../entity/Costumer";
import { BaseController } from "./BaseController";
import {Request} from 'express'
import * as md5 from 'md5'

export class CostumerController extends BaseController<Costumer> {

    constructor(){
        super(Costumer, true);
    }

    async save(request: Request)
    {
        let _costumer = <Costumer>request.body;
        
        super.isRequired(_costumer.name, 'O nome do usuário é obrigatório');
        super.isRequired(_costumer.photo, 'A Foto do usuário é obrigatória');
        super.isRequired(_costumer.email, 'O email do usuário é obrigatório');
        super.isRequired(_costumer.phone, 'O telefone do usuário é obrigatório');
        
        delete _costumer.password;
        
        return super.save(_costumer, request);
    }

    async createCostumer(request: Request){
        let _costumer = <Costumer>request.body;
        let { confirmPassword} = request.body;
        super.isRequired(_costumer.name, 'O nome do usuário é obrigatório');
        super.isRequired(_costumer.photo, 'A Foto do usuário é obrigatória');
        super.isRequired(_costumer.email, 'O email do usuário é obrigatório');
        super.isRequired(_costumer.phone, 'O telefone do usuário é obrigatório');
        super.isRequired(_costumer.password, 'A senha do usuário é obrigatória');
        super.isRequired(request.body.confirmPassword, 'A senha do usuário é obrigatória');
        super.isTrue((_costumer.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes')
    
        if(_costumer.password){
            _costumer.password = md5(_costumer.password);
        }

        return super.save(_costumer, request);
    }

}