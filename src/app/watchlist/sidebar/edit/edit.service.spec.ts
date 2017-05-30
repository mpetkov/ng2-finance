/* tslint:disable:no-unused-variable */
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EditService } from './index';

export function main() {
  describe('EditService', () => {
    let service:EditService;

    beforeEach(() => {
      let injector = TestBed.configureTestingModule({
        providers: [
          EditService
        ]
      });
      service = injector.get(EditService);
    });

    it('should return the orderof HTML list elements when getOrder() is called', () => {
      expect(service.getOrder(null, [])).toEqual([]);

      let element:Element = document.createElement('ul');
      let item:Element = document.createElement('li');
      item.id = 'a';
      element.appendChild(item);
      let list:ElementRef = new ElementRef(element);
      expect(service.getOrder(list, [])).toEqual(['a']);
      expect(service.getOrder(list, ['a'])).toEqual([]);
    });

    it('should return true if moves() is called on an element with class mp-drag', () => {
      let element:Element = document.createElement('div');
      expect(service.getDragOptions().moves(null, null, element)).toBe(false);
      element.classList.add('mp-drag');
      expect(service.getDragOptions().moves(null, null, element)).toBe(true);
    });
  });
}
