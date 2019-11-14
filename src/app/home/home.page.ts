import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  value = 'http://en.uptodown.com';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  constructor(private barcode: BarcodeScanner, private b64: Base64ToGallery
    , private toast: ToastController) {

  }
  scanQRCode() {
    this.barcode.scan().then(
      data => {
        this.scannedCode = data.text;
      }
    );



  }
  downloadQRCode() {

    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    console.log('data: ', imageData);

    let urlData = imageData.split(',')[1];
    this.b64.base64ToGallery(urlData,
      { prefix: '_img', mediaScanner: true }).
      then(async res => {
        let newToast = await this.toast.create({
          header: 'QR Code saved '
        });
        newToast.present();

      }, err => console.log('error: ', err)
      );


  }



}
