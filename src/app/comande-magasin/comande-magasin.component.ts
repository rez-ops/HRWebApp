import { Article } from './../models/article.model';
import { Component, OnInit } from '@angular/core';
import { Service1Service } from './../service1.service';
import { Department } from '../models/department.model';
import { Comande } from '../models/comande.model';
import * as bootstrap from 'bootstrap';
import Swal2 from 'sweetalert2';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-comande-magasin',
  templateUrl: './comande-magasin.component.html',
  styleUrls: ['./comande-magasin.component.css']
})
export class ComandeMagasinComponent implements OnInit {
  selectedDepartment: string = '';
  selectedCostCenter: string = '';
  selectedDepartementId: number = 0;
  filteredDepartments: Department[] = [];

  selectArticleNom: string = '';
  selectArticleReference: string = '';
  listArticle: Article[] = [];
  selectArticleId:number=0;

  quantityRequested!: number;
  
  user: any;

  comande: Comande = {
    id: 0,
    typeBon: '',
    departmentId: 0,
    userId: 0,
    typePiece: '',
    articles: [],
    date: new Date(),
    costCenter: ''
  };
  
  article: any;
  listArticle1: Article[] = [];
  constructor(private service1Service: Service1Service) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  onDepartmentInput(event: any) {
    const query = event.target.value;
    if (query.length >= 1) {
      this.service1Service.searchDepartments(query).subscribe(
        data => {
          this.filteredDepartments = data;
        },
        error => {
          Swal2.fire('Error fetching departments:', 'You clicked the button!', 'error');
          console.error('Error fetching departments:', error);
        }
      );
    } else {
      this.filteredDepartments = [];
    }
  }

  onArticleInput(event: any) {
    const query = event.target.value;
    if (query.length >= 1) {
      this.service1Service.searchArticle(query).subscribe(
        data => {
          this.listArticle = data;
        },
        error => {
          Swal2.fire('Error fetching articles:', 'You clicked the button!', 'error');
          console.error('Error fetching articles:', error);
        }
      );
    } else {
      this.listArticle = [];
    }
  }

  selectArticle(article: Article) {
    this.selectArticleNom = article.machine_zone;
    this.selectArticleReference = article.reference;
    this.quantityRequested = article.quantiteDemander; // Optional
    this.selectArticleId=article.id
    this.listArticle = []; // Clear the list after selection

    // Add the selected article to the comande
    
  }

  selectDepartment(department: Department) {
    this.selectedDepartment = department.nom;
    this.selectedCostCenter = department.costCenter;
    this.selectedDepartementId = department.id;

    // Update comande with selected department
    this.comande.departmentId = department.id;
    this.filteredDepartments = [];
  }

  ajouterArticle() {
    if (this.selectArticleNom && this.selectArticleReference && this.quantityRequested > 0) {
      const newArticle: any = {
        id:this.selectArticleId,
        machine_zone: this.selectArticleNom,
        reference: this.selectArticleReference,
        quantiteDemander: this.quantityRequested
      };

      // Avoid tracking issue by creating a new instance of Article with only the necessary properties
      this.comande.articles.push({ ...newArticle });
  
      // Log pour vérifier l'ajout
      console.log('Article ajouté:', newArticle);
      console.log('Liste actuelle des articles:', this.comande.articles);
  
      // Réinitialisation des champs de saisie
      this.selectArticleId=0
      this.selectArticleNom = '';
      this.selectArticleReference = '';
      this.quantityRequested = 0;
    } else {
      Swal2.fire('Veuillez remplir les champs de l\'article.', 'You clicked the button!', 'warning');
      this.affisuccesspopup('Veuillez remplir les champs de l\'article.');
      
    }
  }

  create() {
    // Vérifiez que tous les champs requis sont bien remplis
    if (!this.comande.typeBon || !this.comande.departmentId || !this.comande.typePiece || this.comande.articles.length === 0) {
      //this.affisuccesspopup('Veuillez remplir tous les champs requis et ajouter au moins un article.');
      Swal2.fire('Veuillez remplir tous les champs requis.', 'You clicked the button!', 'warning');
      return;
    }
  
    this.comande.userId = this.user.id;
    console.log("this.comande", this.comande);
    console.log("this.comande", this.comande.articles);
    
    this.service1Service.createCommande(this.comande, this.user.id).subscribe(
      response => {
        console.log('Commande créée avec succès', response);
        this.generatePDF();
        
        //this.affisuccesspopup('comande cree avec succee.');
        
        this.resetForm();
      },
      error => {
        console.error('Erreur lors de la création de la commande', error);
        //this.affisuccesspopup('Une erreur est survenue lors de la création de la commande.');
        Swal2.fire('Une erreur est survenue lors de la création de la commande.', 'You clicked the button!', 'error');
        
      }
    );
  }



  

  generatePDF() {


    //ya3melek capture decrant lel page eli te5dem 3leha 


    /*const data = document.getElementById('form-tab'); // ID du conteneur du formulaire
  
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210; // Largeur A4 en mm
        const pageHeight = 295; // Hauteur A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
  
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('formulaire.pdf');
      });
    }*/

//ya5arejlek pdf ama fi chakel text ya3ni

      /*const doc = new jsPDF();

  // Définir la police et la taille pour le titre
  doc.setFont('Arial', 'bold');
  doc.setFontSize(20);
  doc.text('Commande Détails', 14, 20);

  // Définir la police et la taille pour les informations
  doc.setFont('Arial', 'normal');
  doc.setFontSize(14);

  // Convertir la date en objet Date si nécessaire
  let formattedDate = '';
  if (this.comande.date) {
    const dateObj = new Date(this.comande.date);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toLocaleDateString();
    } else {
      formattedDate = 'Date invalide';
    }
  }

  // Ajouter des informations personnalisées
  doc.text(`Type de bon:        ${this.comande.typeBon || ''}`, 14, 30);
  doc.text(`Département:        ${this.selectedDepartment || ''}`, 14, 40);
  doc.text(`Centre de coût:     ${this.selectedCostCenter || ''}`, 14, 50);
  doc.text(`Type de pièce:      ${this.comande.typePiece || ''}`, 14, 60);
  doc.text(`Date de création:   ${formattedDate}`, 14, 70);

  // Ajouter les articles
  doc.text('Articles:', 14, 90);

  // Set the starting y position for article list
  let yPosition = 100;

  // Loop through the articles and add them to the PDF
  if (this.comande.articles && this.comande.articles.length > 0) {
    this.comande.articles.forEach((article, index) => {
      const articleText = `${index + 1}. Machine/Zone:    ${article.machine_zone || ''}, Référence:     ${article.reference || ''}, Quantité demandée:    ${article.quantiteDemander || ''}`;
      
      // Add text and update yPosition for each article
      doc.text(articleText, 14, yPosition);
      
      // Update yPosition for next line
      yPosition += 10; // Adjust spacing as needed
    });
  } else {
    doc.text('Aucun article ajouté.', 14, yPosition);
  }

  // Sauvegarder le PDF
  doc.save('commande.pdf');*/




  //zeyed chway 3la loul just y5arejlek table ta3 liste darticle


  const doc = new jsPDF(
    {
      unit: 'cm'
    }
  );



  // Add the header
// -------------------------------------------------------------------------------
doc.setLineWidth(0.05);
doc.line(1, 1, 20, 1); // Top line
doc.line(1, 1, 1, 28.7);//ligne horizontale a gauche
doc.line(20, 1, 20, 28.7);//ligne horizontale a droite
doc.line(1, 3, 20, 3); // Bottom line de header
doc.line(1, 28.7, 20, 28.7); // dernier line
doc.line(1, 3, 20, 3); // Bottom line

doc.line(5, 1, 5, 3); // ligne 1
doc.line(15.5, 1, 15.5, 3); // ligne 2

doc.setFont('Arial', 'bold');
doc.setFontSize(12);

doc.setTextColor(0, 0, 128);

// Add the company name with navy blue color
doc.text('SEBN TN2', 1.5, 1.5);





// Reset the text color to black (RGB: 0, 0, 0) for the rest of the document
doc.setTextColor(0, 0, 0);

// PDF name in the center
doc.text('Bnde de sortie/retour magasin central', 10.5, 1.5, { align: 'center' });

// Date on the right
const today = new Date();
const dateStr = today.toLocaleDateString('fr-FR');
doc.text(`Date: ${dateStr}`, 16, 1.5);


// -------------------------------------------------------------------------------

// Définir la police et la taille pour le titre
doc.setFont('Arial', 'bold');
doc.setFontSize(16); // Taille de police approximative en pt
doc.text('Commande Détails :', 1.5, 5); // 1.5 cm du bord gauche et 5 cm du haut

// Définir la police et la taille pour les informations
doc.setFont('Arial', 'normal');
doc.setFontSize(12);;

// Convertir la date en objet Date si nécessaire
let formattedDate = '';
if (this.comande.date) {
  const dateObj = new Date(this.comande.date);
  if (!isNaN(dateObj.getTime())) {
    formattedDate = dateObj.toLocaleDateString();
  } else {
    formattedDate = 'Date invalide';
  }
}

// Ajouter des informations personnalisées
doc.text(`Type de bon:        ${this.comande.typeBon || ''}`, 2.5, 6);

doc.setFont('Arial', 'bold');
doc.setFontSize(14);
doc.text('#', 1.5, 7);
doc.text('Nom du demandeur', 2, 7);
doc.text('Matricule', 8, 7);
doc.text('Department', 12, 7);
doc.text('cost center', 16, 7);



doc.setFontSize(12);
doc.setFont('Arial', 'normal');
doc.setFontSize(12);;
doc.text(`${this.user.nom  || ''} ${this.user.prenom  || ''} `, 2, 8);//nom
doc.text(`${this.user.matricule || ''}`, 8, 8);//department
doc.text(`${this.selectedDepartment || ''}`, 12, 8);//department
doc.text(`${this.selectedCostCenter || ''}`, 16, 8);// cost center


doc.setLineWidth(0.12);
doc.line(4, 10, 17, 10);


doc.setFontSize(14);
doc.text(`Type de pièce:      ${this.comande.typePiece || ''}`, 1.5, 11);
//doc.text(`Date de création:   ${formattedDate}`, 1.5, 10);


doc.setLineWidth(0.12);
doc.line(4, 12, 17, 12);

// Ajouter les articles
doc.setFont('Arial', 'bold');
doc.setFontSize(14);
doc.text('Articles:', 1.5, 13);


doc.setFont('Arial', 'normal');
// Draw table manually
const tableStartY = 14;
const rowHeight = 0.8; // Hauteur des lignes en cm
const columnWidths = [1, 6, 6, 4]; // Largeurs des colonnes en cm

// Draw table header
doc.setFont('Arial', 'bold');

doc.text('#', 1.5, tableStartY);
doc.text('Référence', 2.5, tableStartY);
doc.text('Machine/Zone', 6.5, tableStartY);

doc.text('Quantité demandée', 10.5, tableStartY);
doc.text('date de damande', 15.5, tableStartY);
doc.setFont('Arial', 'normal');

// Draw table rows
doc.setFontSize(12);
let yPosition = tableStartY + rowHeight;
this.comande.articles.forEach((article, index) => {
  doc.text((index + 1).toString(), 1.5, yPosition);
  doc.text(article.machine_zone || '', 6.5, yPosition);
  doc.text(article.reference || '', 2.5, yPosition);
  doc.text(article.quantiteDemander.toString() || '', 10.5, yPosition);
  doc.text(` ${formattedDate}`, 15.5, yPosition);

  yPosition += rowHeight;
});





doc.setFont('Arial', 'bold');
doc.text('Visa Manager :', 14, 26);







// Convert the PDF document to a Blob
const pdfBlob = doc.output('blob');

// Create a URL for the Blob
const pdfUrl = URL.createObjectURL(pdfBlob);

// Open the PDF in a new window/tab for preview
window.open(pdfUrl, '_blank');

// Confirm download
Swal2.fire({
  title: 'Do you want to download this file?',
  text: 'You will be able to open the file after the download.',
  icon: 'info',
  showCancelButton: true,
  confirmButtonText: 'Yes, download it!',
  cancelButtonText: 'No, cancel',
}).then((result) => {
  if (result.isConfirmed) {
    // Trigger the file download
    doc.save('commande.pdf'); 
    
    Swal2.fire('comande cree avec succee.', 'You clicked the button!', 'success');
  } else if (result.dismiss === Swal2.DismissReason.cancel) {
    Swal2.fire('Cancelled', 'Your file download was cancelled.', 'info');
    Swal2.fire('creation!', 'Your comand has been created successfully.', 'success');
  }
});
  
}
  






























  

  resetForm() {
    this.selectedDepartment = '';
    this.selectedCostCenter = '';
    this.selectedDepartementId = 0;
    this.filteredDepartments = [];
    this.selectArticleNom = '';
    this.selectArticleReference = '';
    this.listArticle = [];
    this.quantityRequested = 0;
    
    this.comande ={
      id: 0,
      typeBon: '',
      departmentId: 0,
      costCenter:"",
      userId: 1,
      typePiece: '',
      articles: [],
      date: new Date()
    };
  }




  affisuccesspopup(msg: string) {
    const modalElement: any = document.getElementById('successModal');
    const modalBodyElement: any = modalElement.querySelector('.modal-body');
    
    // Mettre à jour le contenu de la modale avec le message
    modalBodyElement.textContent = msg;
    
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  
    setTimeout(() => {
      bootstrapModal.hide();
    }, 2000);
  }
}
