import { Controller } from '@nestjs/common';
import { Body, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateTableDto } from 'src/dto/create-table.dto';
import { UpdateTableDto } from 'src/dto/update-table.dto';
import { TableService } from 'src/service/table.service';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) { }
 @Post()
    async createOrLoadTable(@Res() response, @Body() createTableDto: CreateTableDto) {
   try {
        const isTableExist = await this.tableService.getTable(createTableDto.name);
        if (isTableExist.length > 0) {
            return response.status(HttpStatus.OK).json({
            name: isTableExist[0].name,
            tasks: isTableExist[0].tasks
        });
         }
         else {
            const newTable = await this.tableService.createTable(createTableDto);
            return response.status(HttpStatus.CREATED).json({
            name: newTable.name,
            tasks: newTable.tasks
         });
        }
  } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode: 400,
     message: 'Error: Table not created!',
     error: 'Bad Request'
  });
  }
 }

 @Put(':tableName')
 async updateTable(@Res() response, @Param('tableName') tableName, @Body() updateTableDto: UpdateTableDto) {
   try {
     const updatedTable = await this.tableService.updateTable(tableName, updateTableDto);
     if (!updatedTable) {
       return response.status(HttpStatus.NOT_FOUND).json({
         statusCode: 404,
         message: 'Table not found!',
         error: 'Not Found'
       });
     }
     return response.status(HttpStatus.OK).json({
       message: 'Table has been successfully updated',
       table: updatedTable
     });
   } catch (err) {
     return response.status(HttpStatus.BAD_REQUEST).json({
       statusCode: 400,
       message: 'Error: Table not updated!',
       error: 'Bad Request'
     });
   }
 }
   
      @Get(':tableName')
      async getTable(@Res() response, @Param('tableName') tableName) {
         try {
               const table = await this.tableService.getTable(tableName);
               if (table.length === 0) {
                  return response.status(HttpStatus.NOT_FOUND).json({
                     statusCode: 404,
                     message: 'Table not found!',
                     error: 'Not Found'
                  });
               }
               return response.status(HttpStatus.OK).json(table);
         } catch (err) {
               return response.status(HttpStatus.BAD_REQUEST).json({
                  statusCode: 400,
                  message: 'Error: Table not found!',
                  error: 'Bad Request'
               });
         }
      }
}
