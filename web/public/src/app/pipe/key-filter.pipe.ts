import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
	name: 'keyFilter' 
})

export class KeyFilterPipe implements PipeTransform {

  	transform(keys: any[], searchText: string): any[] {
	    
	    if (!keys || !searchText) {
            return keys;
            console.log(keys);
        }

        searchText = searchText.toLowerCase();

		return keys.filter( keys =>
			keys.key.toLowerCase().indexOf(searchText) !== -1
		);
   }

}