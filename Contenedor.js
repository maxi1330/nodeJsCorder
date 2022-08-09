const fs = require('fs');

class Contenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = "./archivos/" + nombreArchivo;
    }

    async save(objectToSave) {
        let objects = await this.getAll();
        let newId = objects.length === 0 ? 1 : objects[objects.length - 1].id + 1;
        const objectToSaveNew = {id: newId, ...objectToSave};
        objects.push(objectToSaveNew);
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objects,null,2));
            return newId;
        } catch (e) {
            throw new Error(`Error al guardar`)
        }
    }

    async getById(objectId){
        const objects = await this.getAll();
        return objects.filter(element => element.id === objectId);
    }

    async getAll(){
        try {
            return JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'));
        } catch (e) {
            return [];
        }
    }

    async deleteById(objectId){
        const objects = await this.getAll();
        const objectsFiltered = objects.filter(element => element.id !== objectId);
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objectsFiltered));
        } catch (e) {
            throw new Error(`Error al borrar`)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
        } catch (e) {
            throw new Error(`Error al borrar todo`)
        }
    }
}

module.exports = Contenedor;