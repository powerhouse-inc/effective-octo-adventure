import { default as writeClient } from '../clients/system';

type AddDriveArgs = {
    global: {
        id: string,
        name?: string,
        slug?: string,
        icon?: string,
    },
    preferredEditor?: string,
}

export class SystemGraphClient {
  protected readonly writeClient: typeof writeClient;

  constructor(mutationsSubgraphUrl: string) {
    // @ts-expect-error weird commonjs thing
    this.writeClient = writeClient.client ?? writeClient;
    this.writeClient.setUrl(mutationsSubgraphUrl);
  }

  public async createDrive(id: string, preferredEditor: string, slug?: string, name?: string, icon?: string) {
    const args: AddDriveArgs = {
        preferredEditor: preferredEditor,
        global: {
            id,
            name, 
            slug,
            icon,
        }
    };
    
    const result = await this.writeClient.mutations.addDrive({
        __args: args,
        id: true,
        name: true, 
        slug: true,
        icon: true,
    });

    return result; 
  }
}
