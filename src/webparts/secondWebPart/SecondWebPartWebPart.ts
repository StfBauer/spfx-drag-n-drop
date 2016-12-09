import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as DragNDrop from '../coreComponents/DropBoxes';

import * as strings from 'secondWebPartStrings';
import SecondWebPart, { ISecondWebPartProps } from './components/SecondWebPart';
import { ISecondWebPartWebPartProps } from './ISecondWebPartWebPartProps';

export default class SecondWebPartWebPart extends BaseClientSideWebPart<ISecondWebPartWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<ISecondWebPartProps> = React.createElement(SecondWebPart, {
      description: this.properties.description
    });

    const myDropBox = React.createElement(DragNDrop.DragNDropContainer, {
      items: [], // Empty container
      title: this.title
    });

    // add drop box to UI
    ReactDom.render(myDropBox, this.domElement);

  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
