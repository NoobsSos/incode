import { Injectable } from '@nestjs/common';
import { Table } from '../schemas/table.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ITable } from '../interface/table.interface';
import { CreateTableDto } from 'src/dto/create-table.dto';
import { UpdateTableDto } from 'src/dto/update-table.dto';

@Injectable()
export class TableService {
    constructor(@InjectModel(Table.name) private Table) { }

    async createTable(createTableDto: CreateTableDto): Promise<ITable> {
        const newTable = await new this.Table(createTableDto);
        return newTable.save();
    }

    async getTable(tableName): Promise<ITable[]> {
        return this.Table.find( { name: tableName } );
    }

    async updateTable(tableName: string, updateTableDto: UpdateTableDto): Promise<Table> {
        const table = await this.Table.findOne({ name: tableName });
    
        console.log(updateTableDto)
        console.log(table)

        table.tasks = [...table.tasks, updateTableDto];
    
        return table.save();
      }
}
