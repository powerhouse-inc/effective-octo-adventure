import { getPNDTitle, pndContentToString } from '../../document-models/utils';
import { default as writeClient } from '../clients/atlas-foundation';
import { ParsedNotionDocument } from './atlas-base/NotionTypes';
import { DocumentsCache } from './common/DocumentsCache';
import { ReactorClient } from './common/ReactorClient';
import { gql } from 'graphql-request';
import { AtlasBaseClient, mutationArg } from './atlas-base/AtlasBaseClient';
import { AtlasFoundationState, SetContentInput, SetDocNumberInput, SetMasterStatusInput, SetNotionIdInput, SetFoundationNameInput, SetAtlasTypeInput, SetParentInput, SetProvenanceInput, FStatus, Maybe, FDocumentLink  } from 'document-models/atlas-foundation';
import { extractDocNoAndTitle } from './atlas-base/utils';

const DOCUMENT_TYPE = 'sky/atlas-foundation';

export class AtlasFoundationClient extends AtlasBaseClient<AtlasFoundationState, typeof writeClient> {
  private readonly driveId: string; 

  constructor(mutationsSubgraphUrl: string, documentsCache: DocumentsCache, readClient: ReactorClient, driveId: string) {
    super(DOCUMENT_TYPE, mutationsSubgraphUrl, documentsCache, readClient, writeClient);
    this.driveId = driveId;
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
      { __args: { driveId: this.driveId, name: getPNDTitle(notionDoc) } }
    );
  }

  protected getTargetState(input: ParsedNotionDocument, currentState: AtlasFoundationState): AtlasFoundationState {
    const [docNo, title] = extractDocNoAndTitle(input.docNo, input.name);
    
    let parent: Maybe<FDocumentLink> = null;
    for (let i=0; parent === null && i<input.parents?.length || 0; i++) {
      const parentDocIds = this.documentsCache.resolveInputId(input.parents[i]);
      if (parentDocIds.length) {
        const parentDoc = this.documentsCache.searchDocument(parentDocIds[0]);
        if (parentDoc) {
          parent = {
            id: parentDoc.id,
            name: parentDoc.name || null,
            docNo: parentDoc.state?.docNo || null
          };
        }
      }
    }

    if (parent === null) {
      console.log(`Can't find the parent in document cache: ${input.parents?.join(',')}`);
    }

    return {
      ...currentState,
      docNo,
      name: title,
      masterStatus: input.masterStatusNames[0]?.toUpperCase() || "PLACEHOLDER",
      content: input.content.map(c => pndContentToString(c)).join("\n").trim(),
      notionId: input.id,
      provenance: input.hubUrls,
      parent
    };
  }

  protected async patchField<K extends keyof AtlasFoundationState>(id: string, fieldName: K, current: AtlasFoundationState[K], target: AtlasFoundationState[K]) {
    console.log(` > ${fieldName}: ${current ? current + ' ' : ''}> ${target}`);
    const patch = this.writeClient.mutations, arg = mutationArg(this.driveId, id);

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
        await patch.AtlasFoundation_setProvenance(arg<SetProvenanceInput>({ provenance: target }));
        break;
      case 'parent':
        await patch.AtlasFoundation_setParent(arg<SetParentInput>({ ...target }));
        break;
      default: 
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }
}