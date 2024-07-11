import { CreateWorkflowDto } from '@app/workflows';
import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { WORKFLOWS_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BuildingsService {
  constructor(
      @InjectRepository(Building)
      private readonly buildingsRepository: Repository<Building>,
      @Inject(WORKFLOWS_SERVICE)
      private readonly workflowsService: ClientProxy,
  ) {}

  async findAll(): Promise<Building[]> {
    return this.buildingsRepository.find();
  }

  async findOne(id: number): Promise<Building> {
    const building = await this.buildingsRepository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException(`Building #${id} does not exist`);
    }
    return building;
  }

  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const building = this.buildingsRepository.create({
      ...createBuildingDto,
    });
    const newBuildingEntity = await this.buildingsRepository.save(building);

    // Create a workflow for the new building
    await this.createWorkflow(newBuildingEntity.id);
    return newBuildingEntity;
  }

  async update(
      id: number,
      updateBuildingDto: UpdateBuildingDto,
  ): Promise<Building> {
    const building = await this.buildingsRepository.preload({
      id: +id,
      ...updateBuildingDto,
    });

    if (!building) {
      throw new NotFoundException(`Building #${id} does not exist`);
    }
    return this.buildingsRepository.save(building);
  }

  async remove(id: number): Promise<Building> {
    const building = await this.findOne(id);
    return this.buildingsRepository.remove(building);
  }

  async createWorkflow(buildingId: number) {
    const newWorkflow = await lastValueFrom(
        this.workflowsService.send('workflows.create', {
          name: 'My Workflow',
          buildingId,
        } as CreateWorkflowDto),
    );
    console.log({ newWorkflow });
    return newWorkflow;
  }
}