import {Entity, Column} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({name: 'Costumer'})
export class Costumer extends BaseEntity {

  
    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length: 200})
    photo: string;


    @Column({type: 'varchar', length: 200})
    email: string;


    @Column({type: 'varchar', length: 50})
    phone: string;


    @Column({type: 'varchar', length: 100})
    password: string;

    



    
}
