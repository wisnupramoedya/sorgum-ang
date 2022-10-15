export class DataParameterParams
{
  ParamDate!: Date;
  MicroIds!: number[];
  ParentTypeIds!: number[];
}

export class GraphDataDto {
  Value!: number;
  CreatedAt!: Date;
}

export class GraphDataParameterDto
{
  MicroId!: number;
  MicroName!: string;
  ParentTypeId!: number;
  ParentTypeName!: string;
  Values!: GraphDataDto[];
}
