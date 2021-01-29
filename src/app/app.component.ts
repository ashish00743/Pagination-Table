import { Component, ViewChild } from '@angular/core';
import { CSVRecord } from './CSVModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular7-readCSV';
  defaultPagination = 10;
  paginationValue = 10;
  options=[10,20,30,40,50]
  searchTerm = ''
  filterObject ={
    name: '',
    paginationValue: 10
  }
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = [];
        if ((csvData.toString()).indexOf(',') != -1) {
          csvRecordsArray = (<string>csvData).split(/\r\n/);
        }
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any) {
    let csvArr = [];
    if (csvRecordsArray.length != 0) {
      for (let i = 0; i < csvRecordsArray.length; i++) {
        let curruntRecord = (<string>csvRecordsArray[i]).split(',');
        if (csvRecordsArray[i] != "") {
          let csvRecord: CSVRecord = new CSVRecord();
          csvRecord.id = curruntRecord[0].trim();
          csvRecord.firstName = curruntRecord[1].trim();
          csvRecord.lastName = curruntRecord[2].trim();
          csvRecord.age = curruntRecord[3].trim();
          csvRecord.position = curruntRecord[4].trim();
          csvRecord.mobile = curruntRecord[5].trim();
          csvArr.push(csvRecord);
        }
      }
      return csvArr;
    } else {
      alert("No Records Found");
      this.defaultPagination = 10
      this.filterObject = {
        paginationValue: 10,
        name: ''
      }
      this.searchTerm = ''
      return []
    }
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.defaultPagination = 10
    this.filterObject = {
      paginationValue: 10,
      name: ''
    }
    this.searchTerm = ''
  }
  updatePagination(value){
   this.filterObject = {...this.filterObject, paginationValue: value};
   this.defaultPagination = value;
  }
  search(value){
    this.filterObject = {...this.filterObject, name: value}
  }
}
