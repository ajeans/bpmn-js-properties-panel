import TextField from '@bpmn-io/properties-panel/lib/components/entries/TextField';

import {
  useService
} from '../../../hooks';


export default function FormFieldProperty(props) {

  const {
    idPrefix,
    element,
    property
  } = props;

  const entries = [
    {
      id: idPrefix + '-id',
      component: <Id idPrefix={ idPrefix } element={ element } property={ property } />
    },
    {
      id: idPrefix + '-value',
      component: <Value idPrefix={ idPrefix } element={ element } property={ property } />
    }];

  return entries;
}

function Id(props) {
  const {
    idPrefix,
    element,
    property
  } = props;

  const commandStack = useService('commandStack'),
        translate = useService('translate'),
        debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('properties-panel.update-businessobject', {
      element: element,
      businessObject: property,
      properties: {
        id: value
      }
    });
  };

  const getValue = () => {
    return property.id;
  };

  return TextField({
    element: property,
    id: idPrefix + '-id',
    label: translate('ID'),
    getValue,
    setValue,
    debounce
  });
}

function Value(props) {
  const {
    idPrefix,
    element,
    property
  } = props;

  const commandStack = useService('commandStack'),
        translate = useService('translate'),
        debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('properties-panel.update-businessobject', {
      element: element,
      businessObject: property,
      properties: {
        value: value
      }
    });
  };

  const getValue = () => {
    return property.value;
  };

  return TextField({
    element: property,
    id: idPrefix + '-value',
    label: translate('Value'),
    getValue,
    setValue,
    debounce
  });
}
