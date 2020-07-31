import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector:'app-deletecomp-dialog',
    template:`<h3 mat-dialog-title >You are about to delete {{passedData.name}}</h3>
                <mat-dialog-actions>
                    <button mat-button mat-dialog-close = "true" >Delete</button>
                    <button mat-button mat-dialog-close = "false" >Cancel</button>
                </mat-dialog-actions>`
})
export class DeleteChannelComponent {

    constructor( @Inject(MAT_DIALOG_DATA) public passedData:any ){}
}