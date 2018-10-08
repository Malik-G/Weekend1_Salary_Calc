
$(document).ready(readyNow);
   
let employeeArray = [];
let monthly = 0;

class EmployeeInfo {
   constructor(first, last, id, title, salary){
      this.first = first;
      this.last = last;
      this.id = id;
      this.title = title;
      this.salary = salary;
   }
}

//Set up button click events
function readyNow(){
   $('#submitButton').on('click', submitForm);
   $('table').on('click', 'button', deleteEmployee);
   
}

//Turn the input values into properties of an EmployeeInfo object and push into employeesArray
function submitForm(){
   event.preventDefault();
   let fName = $('#firstNameInput').val();
   let lName = $('#lastNameInput').val();
   let empId = $('#idInput').val();
   let empTitle = $('#titleInput').val();
   let empSalary = Number($('#salaryInput').val().replace(/,/g, ''));
   //Check for empty inputs
   if(fName === '' || lName === '' || empId === '' || empTitle === '' || empSalary === 0) {
      alert('Cannot continue with missing information.');
      return false;
   }
   let newObj = new EmployeeInfo(fName, lName, empId, empTitle, empSalary)
   $('tbody').append( `<tr>
      <td>${newObj.first}</td>
      <td>${newObj.last}</td>
      <td>${newObj.id}</td>
      <td>${newObj.title}</td>
      <td>$${newObj.salary}</td>
      <td><button id="delete">Delete</button></td></tr>`);
   employeeArray.push(newObj);
   emptyInputs();
   increaseMonthly(empSalary/12);
}

function deleteEmployee(){
   let targetTr = $(this).closest('tr'); //targets the tr that the clicked delete button reside in
   let targetSalary = $(this).parent().prev(); //target the nearest sibling of the button's parent going backward, a.k.a the salary td
   let getSalary = parseInt(targetSalary.text().replace(/\$/g, '')); //get text from salary td, convert to a number
   let nameTd = targetTr.children(':first').text(); //get the tr's first child, a.k.a the employee first name td
   decreaseMonthly(getSalary/12);
   console.log(nameTd);
   //remove the deleted employee from the array
   for(let i = 0; i < employeeArray.length; i++) {
      if(nameTd.includes(employeeArray[i].first)){
         employeeArray.splice(i, 1);
         console.log(employeeArray);
         
      }
   }
   targetTr.remove(); //removes the entire tr from the DOM
}

function increaseMonthly(num){
   monthly += num;
   console.log('Monthly costs should now be: $' + monthly.toFixed(2));
   emptyAppendMonthly();
}

function decreaseMonthly(num) {
   monthly -= num;
   console.log('Monthly costs should now be: $' + monthly.toFixed(2));
   emptyAppendMonthly();
}

function emptyAppendMonthly(){
   $('#monthlyCosts').empty();
   if(monthly > 20000){
      $('#monthlyCosts').append(`<td id="monthlyCosts" class="red" colspan="6">Total Monthly Costs: $${monthly.toFixed(2)}</td>`);
   }
   else {
      $('#monthlyCosts').append(`<td id="monthlyCosts" colspan="6">Total Monthly Costs: $${monthly.toFixed(2)}</td>`);
   }
}

function emptyInputs(){
   $('#firstNameInput').val('');
   $('#lastNameInput').val('');
   $('#idInput').val('');
   $('#titleInput').val('');
   $('#salaryInput').val('');
}