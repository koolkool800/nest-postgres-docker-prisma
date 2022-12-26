import { PartialType } from '@nestjs/swagger';
import { CreateTestingDto } from './create-testing.dto';

export class UpdateTestingDto extends PartialType(CreateTestingDto) {}
