import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPlaylist } from './creation-playlist';

describe('CreationPlaylist', () => {
  let component: CreationPlaylist;
  let fixture: ComponentFixture<CreationPlaylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationPlaylist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationPlaylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
