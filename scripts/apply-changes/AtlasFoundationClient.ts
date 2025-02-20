import { getPNDTitle, pndContentToString } from 'document-models/utils';
import { client as writeClient } from '../clients/atlas-foundation';
import { ParsedNotionDocument } from './atlas-base/NotionTypes';
import { DocumentsCache } from './common/DocumentsCache';
import { ReactorClient } from './common/ReactorClient';
import { gql } from 'graphql-request';
import { AtlasBaseClient, mutationArg } from './atlas-base/AtlasBaseClient';
import { AtlasFoundationState, SetContentInput, SetDocNumberInput, SetMasterStatusInput, SetNotionIdInput, SetFoundationNameInput, SetAtlasTypeInput, SetParentInput, SetProvenanceInput, FStatus  } from 'document-models/atlas-foundation';

const DOCUMENT_TYPE = 'sky/atlas-foundation';

export class AtlasFoundationClient extends AtlasBaseClient<AtlasFoundationState, typeof writeClient> {
  constructor(mutationsSubgraphUrl: string, documentsCache: DocumentsCache, readClient: ReactorClient) {
    super(DOCUMENT_TYPE, mutationsSubgraphUrl, documentsCache, readClient, writeClient);

    this.setDocumentSchema(gql`
      AtlasFoundation {
        id
        name
        state {
          docNo
          name
          parent {
            id
            name
            docNo
          }
          masterStatus
          atlasType
          content
          globalTags
          notionId
          references {
            id
            name
            docNo
          }
          originalContextData {
            id
            name
            docNo
          }
          provenance
        }
        revision
      }
    `);
  }

  protected createDocumentFromInput(notionDoc: ParsedNotionDocument) {
    return this.writeClient.mutations.AtlasFoundation_createDocument(
      { __args: { name: getPNDTitle(notionDoc) } }
    );
  }

  protected getTargetState(input: ParsedNotionDocument, currentState: AtlasFoundationState): AtlasFoundationState {
    return {
      ...currentState,
      docNo: input.docNo,
      name: getPNDTitle(input, false),
      masterStatus: input.masterStatusNames[0]?.toUpperCase() || "PLACEHOLDER",
      content: input.content.map(c => pndContentToString(c)).join("\n"),
      notionId: input.id,
      //globalTags: [],
    };
  }

  protected async patchField<K extends keyof AtlasFoundationState>(id: string, fieldName: K, current: AtlasFoundationState[K], target: AtlasFoundationState[K]) {
    console.log(` > ${fieldName}: ${current ? current + ' ' : ''}> ${target}`);
    const patch = this.writeClient.mutations, arg = mutationArg(id);

    switch (fieldName) {
      case 'docNo':
        await patch.AtlasFoundation_setDocNumber(arg<SetDocNumberInput>({ docNo: target as string }));
        break;
      case 'name':
        await patch.AtlasFoundation_setFoundationName(arg<SetFoundationNameInput>({ name: target as string }));
        break;
      case 'masterStatus':
        await patch.AtlasFoundation_setMasterStatus(arg<any>({ masterStatus: target as FStatus }));
        break;
      case 'content':
        await patch.AtlasFoundation_setContent(arg<SetContentInput>({ content: target as string }));
        break;
      case 'notionId':
        await patch.AtlasFoundation_setNotionId(arg<any>({ notionID: target || undefined }));
        break;
      case 'globalTags':
        throw new Error('globalTags patcher is not implemented yet.');
        break;
      case 'originalContextData':
        throw new Error('originalContextData patcher is not implemented yet.');
        break;
      case 'provenance':
        throw new Error('provenance patcher is not implemented yet.');
        break;
    }
  }
}