import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { ConfirmedValidator } from './confirmed.validator';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    types: string[];
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { this.types = ['Restaurante', 'Bar', 'Café', 'Discoteca']; }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            address: ['', [Validators.required, Validators.minLength(12)]],
            type: ['', Validators.required],
            city: ['', [Validators.required, Validators.pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)]],
            phone: ['', [Validators.required, Validators.pattern(/^(?:[0-9] ?){9,14}[0-9]$/)]],
            nit: ['', [Validators.required, Validators.pattern(/^(?:[0-9] ?){9,14}[0-9]$/)]],
            nameAdmin: ['', [Validators.required, Validators.pattern(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{6,}$/)]],
            email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
            password: ['', [Validators.minLength(8), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
            password_check: ['', [Validators.required]]
        }, { validator: ConfirmedValidator('password', 'password_check') });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}