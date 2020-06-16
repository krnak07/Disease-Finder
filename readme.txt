Hello !

To run : framework.js

Database Structure : { Name : (name of Symtom) , Diseases : [(an array of all the diseases corresponding to this symtom)] }

URL : /api/findDesease //to find the disease corresponding to the symptom given

How to give input : Input should be given through the body of the request, through a keyword "symtom".

Type of input : a single symtom(a string) or multiple symtom(an array)

Output : [ {symtom : 'symtom name',diseases : [(diseases corresponding to the symtom)] },....{common : [(if any common disease found among the given symtoms)]} ]

URL : /api/exportDB

what is does : it exports all the data in the excel sheet to mongodb.
