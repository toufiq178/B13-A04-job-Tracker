



// access toggle btns
const allFilterBtn = document.getElementById('btn-filter-all');
const interviewFilterBtn = document.getElementById('btn-filter-interview');
const rejectedFilterBtn = document.getElementById('btn-filter-rejected');


// counting ids
let totalCount = document.getElementById('total-job-application');
let interviewCount = document.getElementById('interview-job-application');
let rejectedCount = document.getElementById('rejected-job-application');
let jobCount = document.getElementById('job-count');


// 
const jobAllCard = document.getElementById('job-card-container');


function toggle(id) {

    // add class 
    allFilterBtn.classList.add('btn-info', 'text-gray-500');
    interviewFilterBtn.classList.add('btn-info', 'text-gray-500');
    rejectedFilterBtn.classList.add('btn-info', 'text-gray-500');

    // remove class
    allFilterBtn.classList.remove('btn-info', 'text-white');
    interviewFilterBtn.classList.remove('btn-info', 'text-white');
    rejectedFilterBtn.classList.remove('btn-info', 'text-white');

    // if select the btn color will changed
    const selectedId = document.getElementById(id);
    selectedId.classList.remove('btn-info', 'text-gray-500');
    selectedId.classList.add('btn-info', 'text-white');

}

function calculateCount() {

    const totalCard = jobAllCard.children.length
    totalCount.innerText = totalCard ;
    jobCount.innerHTML = `${totalCard} jobs` ;
    
}
calculateCount()