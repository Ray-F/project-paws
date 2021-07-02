import { MongoService } from './mongodb/MongoService';
import { Collection, ObjectId } from 'mongodb';
import { Pet } from './Pet';

class PetRepository {
  private mongoService: MongoService;

  private petCollection: Collection<any>;

  constructor(mongoService: MongoService) {
    this.petCollection = mongoService.db.collection('pets');
  }

  /**
   * Get a pet based on the organisation's ID (as a Pet belongs to an organisation/team).
   * @param orgId
   */
  async getPetByOrgId(orgId: string): Promise<Pet> {
    const dbo = await this.petCollection.findOne({ 'orgId': new ObjectId(orgId) });

    if (dbo) {
      return <Pet>dbo;
    }
  }

  /**
   * Lists all `pet`s in the collection.
   */
  async list(): Promise<Pet[]> {
    const dboList = await this.petCollection.find({}).toArray();

    return dboList.map((dbo) => <Pet>dbo);
  }

  /**
   * Saves a `pet` to the collection.
   */
  async save(pet: Pet) {
    if (pet._id) {

      const filter = { '_id': new ObjectId(pet._id) };
      const query = { '$set': pet };
      const options = { upsert: true };

      await this.petCollection.updateOne(filter, query, options);
    }
  }

}


export {
  PetRepository,
};
