import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<T> {
    @ApiProperty()
    status: number;
    @ApiProperty()
    data: T;
    @ApiProperty()
    message: string;
}

export function createResponseDto<T>(dataType: new () => T): new () => ResponseDto<T> {
    class ResponseDtoWithType extends ResponseDto<T> {
      @ApiProperty({ type: dataType })
      data: T;
    }
  
    return ResponseDtoWithType;
  }