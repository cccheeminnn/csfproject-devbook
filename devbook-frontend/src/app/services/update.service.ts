import { Injectable } from "@angular/core";
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SecondPanelData, DevbookUserSkills, DevbookUserWebsites, DevbookUserImages } from '../models/models';

@Injectable()
export class UpdateService {

  constructor (
    private http: HttpClient
  ) {

  }

  // for edit user profile

  updateFirstPanel(firstPanelFormData: FormData) {
    return firstValueFrom(
      this.http.post('/api/update/firstpanel', firstPanelFormData)
    )
  }

  updateSecondPanel(secondPanelData: SecondPanelData) {
    return firstValueFrom(
      this.http.post('/api/update/secondpanel', secondPanelData)
    )
  }

  updateThirdPanel(skills: DevbookUserSkills) {
    return firstValueFrom(
      this.http.post('/api/update/thirdpanel', skills)
    )
  }

  updateFourthPanel(websites: DevbookUserWebsites) {
    return firstValueFrom(
      this.http.post('/api/update/fourthpanel', websites)
    )
  }

  updateFifthPanel(images: FormData) {
    return firstValueFrom(
      this.http.post('/api/update/fifthpanel', images)
    )
  }

  deleteImage(id: string, image: string) {
    const params = new HttpParams().set('userId', id).set('imageName', image)

    return firstValueFrom(
      this.http.get('/api/update/fifthpanel/delete', { params })
    )
  }
}
