export class TypeEntite {
  id: any;
  libelle: string;
  code: string;

  constructor(libelle?: string) {
    this.id = 0;
    this.libelle = libelle;
    this.code = '';
  }
}
