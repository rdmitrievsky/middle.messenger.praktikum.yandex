import Block from './Block';
import Handlebars, { HelperOptions } from 'handlebars';

interface BlockConstructable<Props = any> {
  new(props: Props): Block;
  componentName: string
}

export default function registerComponent<Props extends any>(Component: BlockConstructable<Props>) {
  Handlebars.registerHelper('getUsersMessage', function (currUserId, messageUserId) {
    if (currUserId === messageUserId) {
      return 'message__self'
    } else {
      return ''
    }
  })
  Handlebars.registerHelper('isdefined', function (value) {
    const { display_name: name, first_name: fName, second_name: sName, id, } = value;
    const loginName = name != null ? `@${name}` : '';
    // return new Handlebars.SafeString("<a href='" + url + "'>" + text +"</a>");
    return new Handlebars.SafeString(`<div>${fName} ${sName} ${loginName}</div>`);
  });
  Handlebars.registerHelper('ebebebe', function (value, value2, allowToManage) {
    let url = Handlebars.escapeExpression(value),
    text = Handlebars.escapeExpression(value2)
    if (url != text && allowToManage) {
      return true
    } else {
      false
    }
  });
  Handlebars.registerHelper('setDate', function (date) {
    const messageDate = new Date(date);
    const year = messageDate.getFullYear()
    const month = messageDate.getMonth()
    const day = messageDate.getDate()
    return `${day} : ${month} : ${year}`
  })
  Handlebars.registerHelper('setTime', function (date) {
    const messageDate = new Date(date);
    const hours = messageDate.getHours()
    const minutes = messageDate.getMinutes()
    return `${hours}.${minutes}`
  })
  Handlebars.registerHelper('setvisible', function (value) {
    if (value) {
      return 'chatcontrolmodal_visble'
    } else {
      return ''
    }
  })
  Handlebars.registerHelper(Component.componentName, function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const { children, refs } = data.root;

    (Object.keys(hash) as any).forEach((key: keyof Props) => {
      if (this[key]) {
        hash[key] = hash[key].replace(new RegExp(`{{${key}}}`, 'i'), this[key]);
      }
    });

    const component = new Component(hash);

    children[component.id] = component;

    if (ref) {
      refs[ref] = component.getContent();
    }

    const contents = fn ? fn(this): '';

    return `<div data-id="${component.id}">${contents}</div>`;
  })
}