import test from 'tape';
import { shallow } from 'enzyme';

import {
  List,
  List__item
} from './List';


test('<List>', (t) => {
  const component = shallow(<List><List__item>X</List__item></List>);
  t.ok(component.is('ul'), 'tag name');
  t.ok(component.hasClass('List'), 'tag class');
  t.ok(component.hasClass('List--unordered'), 'tag class');
  t.end();
});

test('<List variant="ordered">', (t) => {
  const component = shallow(<List variant="ordered"><List__item>X</List__item><List__item>X</List__item></List>);
  t.ok(component.is('ol'), 'tag name');
  t.ok(component.hasClass('List'), 'tag class');
  t.ok(component.hasClass('List--ordered'), 'tag class');
  t.equal(component.children().length, 2, 'number of children');
  t.end();
});

test('<List variant="blank">', (t) => {
  const component = shallow(<List variant="blank"><List__item>X</List__item><List__item>X</List__item></List>);
  t.ok(component.is('ul'), 'tag name');
  t.ok(component.hasClass('List'), 'tag class');
  t.ok(component.hasClass('List--blank'), 'tag class');
  t.equal(component.children().length, 2, 'number of children');
  t.end();
});

test('<List className="boogy-monster">', (t) => {
  const component = shallow(<List className="boogy-monster">Yep</List>);
  t.ok(component.is('ul'), 'tag name');
  t.ok(component.hasClass('List'), 'tag class');
  t.ok(component.hasClass('List--unordered'), 'tag class');
  t.ok(component.hasClass('boogy-monster'), 'additional class');
  t.end();
});

test('<List__item className="yahoo">', (t) => {
  const component = shallow(<List__item className="yahoo">Horse</List__item>);
  t.ok(component.is('li'), 'tag name');
  t.ok(component.hasClass('List__item'), 'tag class');
  t.ok(component.hasClass('yahoo'), 'additional class');
  t.equal(component.render().text(), 'Horse', 'content');
  t.end();
});
