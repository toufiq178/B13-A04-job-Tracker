1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

answer : 1 

getElementById is a function that you can access the element of html using the element id .
example: 
<h1 id="programmingHeroTitle"> Hello ProgrammingHero </h1>
document.getElementById ("programmingHeroTitle");

getElementsByClassName is a function that you can access the elements of html using the elements className . If many elements has same class name you can access the all elements using the common className you had given.
example:  
<h1 class="programming"> Hello ProgrammingHero </h1>
<h1 class="programming"> Hello World </h1>
<h1 class="programming"> Hello Developers </h1>
document.getElementsByClassName ("programming");

querySelector uses CSS selector syntax .it works exactly like CSS selectors. You can access the element using  id/className/tagName . if you have many tagName or classes or ids and if you use many elements same className and try to  access the all elements  but you can only access the fist  element . Because querySelector allow to take only first element . css style type because when you access the element if using id then  (#) use that , for class name using (.), for tagName using the tagName  as like css . you can access element dynamically using Comma inside quote , ids , tagNames, classes one single function.
example :
<h1 class="programming"> Hello 1 </h1>
<h1 class="programming"> Hello 2 </h1>
<h1 class="programming"> Hello 3 </h1>
document.querySelector (".programming");
output: Hello 1


querySelectorAll same as like querySelector. But querySelectorAll allows take all matching elements . 
example :
<h1 class="programming"> Hello 1 </h1>
<h1 class="programming"> Hello 2 </h1>
<h1 class="programming"> Hello 3 </h1>
document.querySelectorAll (".programming");
output: Hello 1 ,  Hello 2 , Hello 3 


<!-- -------------------------------------------------------------------------------------------------------------------------------------------------->


2. How do you create and insert a new element into the DOM?

answer :

html
<section id="section"></section>

js
const section = document.getElementById('section');
const div = document.createElement('div');
div.innerHTML = ` <h1> Hello ProgrammingHero </h1> `

section.appendChild(div);


<!-- -------------------------------------------------------------------------------------------------------------------------------------------------->

3. What is Event Bubbling? And how does it work?

answer:

When a specific event called on an element  the event starts and on the element parent  and moves up to its parent  and this process Will continue . This it called event bubbling.


<!-- -------------------------------------------------------------------------------------------------------------------------------------------------->

4. What is Event Delegation in JavaScript? Why is it useful?

answer:

Add event on a parent and you can access the children and you do eventing. You do not need to write a separate function for each child. One function does the job. Even if new children are added, it works dynamically and you do not need to write a separate function.


<!-- -------------------------------------------------------------------------------------------------------------------------------------------------->


5. What is the difference between preventDefault() and stopPropagation() methods?

answer:

preventDefault()
when you call the preventDefault() function its  off default browser behavior .

stopPropagation()
when you call the stopPropagation() function its  off bubbling / capturing and stay on this event .