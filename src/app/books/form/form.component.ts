import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  formType: 'NEW' | 'EDIT';
  submitBtnTxt: 'Create' | 'Update';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.setFormType();
    this.createForm();
    this.loadBook();
    this.setSubmitBtnTxt();
  }

  onSubmit(event) {
    event.preventDefault();

    this.formType === 'NEW' ? this.createBook() : this.updateBook();
  }

  private createBook() {
    this.bookService.createBook(this.form.value);
    this.router.navigate(['/books']);
  }

  private updateBook() {
    const { id } = this.route.snapshot.params;
    this.bookService.updateBook(id, this.form.value);
    this.router.navigate(['/books', id]);
  }

  private setFormType(){
    //console.log(this.route.snapshot.data['formType']);
    this.formType = this.route.snapshot.data['formType'];
  }
  
  private setSubmitBtnTxt() {   
    this.submitBtnTxt = this.formType === 'NEW' ? 'Create' : 'Update';
  }

  private loadBook() {
    if(this.formType === 'NEW') return;

    const { id } = this.route.snapshot.params;
    const { title, description, content} = this.bookService.getBook(+id);  //+id หมายถึง แปลค่า id ให้เป้น number

    this.form.setValue({ title, description, content});
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
}
