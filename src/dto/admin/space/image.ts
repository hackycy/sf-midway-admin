import {
  IsNumberString,
  IsInt,
  ArrayNotEmpty,
  ArrayMinSize,
  Length,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { PageGetDto } from '../../comm';

export class DeleteTypeDto {
  @IsInt()
  @Expose()
  typeId: number;
}

export class CreateTypeDto {
  @Length(2)
  @Expose()
  name: string;
}

export class QueryImageDto extends PageGetDto {
  @IsNumberString()
  @Expose()
  typeId: string;
}

export class DeleteImageDto {
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Expose()
  imageIds: number[];
}

export class UploadImageDto {
  @IsNumberString()
  @Expose()
  typeId: string;
}
