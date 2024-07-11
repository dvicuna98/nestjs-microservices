import { IsNumber, IsString } from 'class-validator';

export class CreateWorkflowDto {
    @IsString()
    name: string;

    @IsNumber()
    buildingId: number;
}