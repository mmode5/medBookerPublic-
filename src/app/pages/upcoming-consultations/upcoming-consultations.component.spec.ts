import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  Booking,
  BookingStatus,
  Role,
  RoleName,
} from 'src/app/models/entity.model';
import { AuthService } from 'src/app/services/auth.service';
import { SingleConsultationComponent } from '../single-consultation/single-consultation.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UpcomingConsultationsComponent } from './upcoming-consultations.component';
import { AppState } from 'src/app/store/states/app.states';
import { selectPastBooking } from 'src/app/store/actions/healthRecord.actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UpcomingConsultationsComponent', () => {
  let component: UpcomingConsultationsComponent;
  let fixture: ComponentFixture<UpcomingConsultationsComponent>;
  let mockAuthService: AuthService;
  let mockbookings$: Observable<Booking[]>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['currentUser']);
    mockbookings$ = of([
      {
        attendees: [
          {
            attendeeType: RoleName.PATIENT,
            entity: {
              entityNo: 123,
              firstName: 'Jane',
              lastName: 'DOe',
            },
            entityNo: 123,
          },
          {
            attendeeType: RoleName.DOCTOR,
            entity: {
              entityNo: 456,
              firstName: 'John',
              lastName: 'Smith',
            },
            entityNo: 456,
          },
        ],
        description: 'Lorem ipsum dolor sit amet',
        endTime: '2023-04-01T10:00:00',
        id: 123,
        startTime: '2023-04-01T09:00:00',
        status: BookingStatus.CONFIRMED,
        statusComment: 'No issues to report',
        title: 'Example Booking',
      },
      {
        attendees: [
          {
            attendeeType: RoleName.PATIENT,
            entity: {
              entityNo: 3,
              firstName: 'Alice',
              lastName: 'Smith',
            },
            entityNo: 3,
          },
          {
            attendeeType: RoleName.DOCTOR,
            entity: {
              entityNo: 4,
              firstName: 'Bob',
              lastName: 'Johnson',
            },
            entityNo: 4,
          },
        ],
        description: 'Quarterly team meeting',
        endTime: '2023-07-01T17:00:00.000Z',
        id: 456,
        startTime: '2023-07-01T15:00:00.000Z',
        status: BookingStatus.CONFIRMED,
        title: 'Q2 Team Meeting',
      },
    ]);

    await TestBed.configureTestingModule({
      declarations: [
        UpcomingConsultationsComponent,
        SingleConsultationComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UpcomingConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-single-consultation', () => {
    fixture.componentInstance.bookings$ = mockbookings$;
    fixture.detectChanges();

    const deCard = fixture.debugElement.queryAll(
      By.css('app-single-consultation')
    );

    expect(deCard.length).toBe(2);
  });
});
