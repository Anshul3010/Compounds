import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/http/api.service';

@Component({
  selector: 'app-compound',
  templateUrl: './compound.component.html',
  styleUrls: ['./compound.component.css']
})
export class CompoundComponent {
  compound:any;

  constructor(private route: ActivatedRoute, private apiService: ApiService){ }

  ngOnInit() {
    const compoundId = this.route.snapshot.paramMap.get('id');
    this.apiService.fetchCompoundById(compoundId).subscribe((res:any)=>{
      this.compound = res.data[0];
    })
  }
}
