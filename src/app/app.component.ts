import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, NgbModalConfig, NgbModal]
})
export class AppComponent {
  form: FormGroup;
  rules: FormArray;
  formData;
  editUnit = {
    coupon_type: '',
    coupon_code: '',
    valid_from: '',
    valid_to: '',
    is_unlimited: null,
    tnc: '',
    is_active: null
  };

  availabilities = [
    { value: true, name: 'Unlimited' },
    { value: false, name: 'Limited' },
  ];

  status = [
    { value: true, name: 'Valid' },
    { value: false, name: 'Invalid' }
  ];

  types = [
    { value: 'User', name: 'User' }
  ];

  discounts = [
    { value: 'Percentage', name: 'Percentage' }
  ];

  constructor(private fb: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      coupon_type: [this.editUnit.coupon_type, Validators.required],
      coupon_code: [this.editUnit.coupon_code, Validators.required],
      valid_from: [this.editUnit.valid_from, Validators.required],
      valid_to: [this.editUnit.valid_to, Validators.required],
      is_unlimited: [this.editUnit.is_unlimited, Validators.required],
      tnc: [this.editUnit.tnc],
      coupon_count: null,
      is_active: [this.editUnit.is_active],
      rules: this.fb.array([this.createRule()])
    });
  }

  createRule() {
    return this.fb.group({
      min_amount: ["", Validators.required],
      max_amount: "",
      discount_type: ["", Validators.required],
      discount: ["", Validators.required],
      max_discount: ""
    })
  }

  addRule() {
    this.rules = this.form.get('rules') as FormArray;
    this.rules.push(this.createRule());
  }

  submitForm(form, content) {
    if (form.invalid) {
      return;
    }
    else {
      this.formData = JSON.parse(JSON.stringify(this.form.value));
      this.formData.coupon_count = this.formData.is_unlimited ? this.formData.coupon_count : this.formData.rules.length; 
      this.open(content);
    }
  }

  open(content) {
    this.modalService.open(content);
  }

}
