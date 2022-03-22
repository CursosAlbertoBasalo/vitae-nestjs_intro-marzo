import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilsService } from 'src/utils/utils.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { Agency } from './entities/agency.entity';
@Injectable()
export class AgenciesService {
  constructor(
    private readonly utilsService: UtilsService,
    @InjectModel(Agency.name) private readonly agencyModel: Model<Agency>,
  ) {}

  async findAll(): Promise<Agency[]> {
    return await this.agencyModel.find();
  }

  async findById(id: string): Promise<Agency> {
    const agency = await this.agencyModel.findById(id);
    console.log(agency);
    return agency;
  }

  async create(createAgency: CreateAgencyDto): Promise<Agency> {
    const agency = await this.agencyModel.create({
      ...createAgency,
      _id: this.utilsService.createGUID(),
    });
    await agency.save();
    return agency;
  }
  async update(agency: UpdateAgencyDto) {
    const agency2 = await this.agencyModel.findByIdAndUpdate(agency._id, agency);
    console.log(agency2);
    return agency2;
  }
  async remove(id: string) {
    return await this.agencyModel.findByIdAndRemove(id);
  }
}
