import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as DragNDrop from '../coreComponents/DropBoxes';

import * as strings from 'firstWebPartStrings';
import FirstWebPart, { IFirstWebPartProps } from './components/FirstWebPart';
import { IFirstWebPartWebPartProps } from './IFirstWebPartWebPartProps';

export default class FirstWebPartWebPart extends BaseClientSideWebPart<IFirstWebPartWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {

    const element: React.ReactElement<IFirstWebPartProps> = React.createElement(FirstWebPart, {
      description: this.properties.description
    });

    // Create a new instance of the DropBox container
    const myDropBox = React.createElement(DragNDrop.DragNDropContainer, {
      items: [
        { title: "EAT" },
        { title: "SLEEP" },
        { title: "<Code>" },
        { title: "Repeat" }
      ],
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
