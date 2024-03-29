import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    daily_rate: number;
    
    @Column()
    avaliable: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    category_id: string;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{name: "car_id"}],
        inverseJoinColumns: [{name: "specification_id"}]
    })
    specifications: Specification[];

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id"})
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
            this.avaliable = true;
        }
    }
}

export { Car }