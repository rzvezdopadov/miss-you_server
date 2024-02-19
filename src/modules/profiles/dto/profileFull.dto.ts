import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileFullDto {
    @ApiProperty({
        type: `string`,
        description: `unique user identifier in the system`,
        examples: [`0`, `5rW8cs74`, `dfwGE45`],
    })
    @IsNotEmpty()
    @IsString()
    readonly userId: string;
}
