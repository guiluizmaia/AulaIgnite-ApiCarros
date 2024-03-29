import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "../../infra/typeorm/entities/Rental";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase{
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}
    async execute({ id, user_id }: IRequest): Promise<Rental>{
        const rental = await this.rentalsRepository.findById(id);
        if(!rental) throw new AppError('Rental not found')
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if(!rental){
            throw new AppError('rental not exists')
        }

        if(!car){
            throw new AppError('car not exists')
        }

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        );

        if(daily <= 0){
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if(delay > 0){
            total = delay * car.fine_amount;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental
    }
}

export {DevolutionRentalUseCase}