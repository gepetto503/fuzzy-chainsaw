import test from 'tape';
import { shallow } from 'enzyme';

import Icon from './Icon';


test('<Icon name="close" /><Icon>', (t) => {
  const component = shallow(<Icon name="close" />);
  t.ok(component.is('svg'), 'tag name');
  t.ok(component.hasClass('Icon'), 'tag class');
  t.ok(component.hasClass('Icon--default'), 'size class');
  t.ok(component.hasClass('Icon--close'), 'icon name class');
  t.ok(component.find('use').length > 0, 'has children');
  t.end();
});

test('<Icon size="small" name="cancel" />', (t) => {
  const component = shallow(<Icon size="small" name="cancel" />);
  t.ok(component.hasClass('Icon--small'), 'size class');
  t.ok(component.hasClass('Icon--cancel'), 'icon name class');
  t.end();
});

test('<Icon size="large" name="plus" />', (t) => {
  const component = shallow(<Icon size="large" name="plus" />);
  t.ok(component.hasClass('Icon--large'), 'size class');
  t.ok(component.hasClass('Icon--plus'), 'icon name class');
  t.end();
});

test('<Icon size="wide" name="minus" />', (t) => {
  const component = shallow(<Icon size="wide" name="minus" />);
  t.ok(component.hasClass('Icon--wide'), 'size class');
  t.ok(component.hasClass('Icon--minus'), 'icon name class');
  t.end();
});

test('<Icon name="plus" variant="light" />', (t) => {
  const component = shallow(<Icon name="plus" variant="light" />);
  t.ok(component.hasClass('Icon'), 'icon class');
  t.ok(component.hasClass('Icon--plus'), 'icon name class');
  t.ok(component.hasClass('Icon--normal'), 'size class');
  t.ok(component.hasClass('Icon--light'), 'variant class');
  t.end();
});

test('<Icon name="plus" data-id="yoyoyo" />', (t) => {
  const component = shallow(<Icon name="plus" data-id="yoyoyo" />);
  t.ok(component.hasClass('Icon--plus'), 'icon name class');
  t.equal(component.props()['data-id'], 'yoyoyo', 'icon data attr');
  t.end();
});
