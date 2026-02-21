let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';



// access toggle btns
const allFilterBtn = document.getElementById('btn-filter-all');
const interviewFilterBtn = document.getElementById('btn-filter-interview');
const rejectedFilterBtn = document.getElementById('btn-filter-rejected');


// counting ids
let totalCount = document.getElementById('total-job-application');
let interviewCount = document.getElementById('interview-job-application');
let rejectedCount = document.getElementById('rejected-job-application');
let jobCount = document.getElementById('job-count');


// card container
const jobAllCard = document.getElementById('job-card-container');
// filter job section
const filterJobs = document.getElementById('filter-jobs');
// main container
const mainContainer = document.querySelector('main');

// total card length
const totalCard = jobAllCard.children.length

function calculateCount() {
    
    // total and jobs count
    totalCount.innerText = totalCard;
    jobCount.innerHTML = `${totalCard} jobs`;

    // interview count
    interviewCount.innerText = interviewList.length;

    // rejected count
    rejectedCount.innerText = rejectedList.length;


}
calculateCount()

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

    currentStatus = id;

    if (id == 'btn-filter-interview') {
        jobAllCard.classList.add('hidden');
        filterJobs.classList.remove('hidden');

        renderInterview();
        interviewEmpty();
        const interviewListCount = interviewList.length;
        jobCount.innerHTML = `${interviewListCount} of ${totalCard} jobs`;


    } else if (id == 'btn-filter-all') {
        jobAllCard.classList.remove('hidden');
        filterJobs.classList.add('hidden');

        calculateCount()


    } else if (id == 'btn-filter-rejected') {
        jobAllCard.classList.add('hidden');
        filterJobs.classList.remove('hidden');

        renderRejected();
        rejectedEmpty();
        const rejectedListCount = rejectedList.length;
        jobCount.innerHTML = `${rejectedListCount} of ${totalCard} jobs`;
    }
}




// 
mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('btn-interview')) {

        // access the card 
        const parentNode = event.target.parentNode.parentNode;

        // toggle border &  borderColor 
        parentNode.parentNode.classList.remove('border-l-7', 'border-error');
        parentNode.parentNode.classList.add('border-l-7', 'border-success');

        // access element of card
        const companyName = parentNode.querySelector('.company-name').innerText;
        const style = parentNode.querySelector('.job-style').innerText;
        const typeSalary = parentNode.querySelector('.job-type-salary').innerText;
        const description = parentNode.querySelector('.job-description').innerText;

        const Status = parentNode.querySelector('.job-status');
        // update status
        Status.innerText = 'Interview';
        Status.classList.remove('border-error', 'bg-red-100', 'text-error');
        Status.classList.add('text-success', 'border', 'border-success', 'bg-green-100', 'rounded-md', 'font-semibold');


        // create object
        const cardInfo = {
            companyName,
            style,
            typeSalary,
            Status: 'Interview',
            description
        }

        // find the company name inside the interviewList cards 
        const interviewExist = interviewList.find(item => item.companyName == cardInfo.companyName);



        // if not match the card the push the card into interviewList
        if (!interviewExist) {
            interviewList.push(cardInfo)
        }


        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);

        if (currentStatus == 'btn-filter-rejected') {
            renderRejected()
        }
        calculateCount()


    } else if (event.target.classList.contains('btn-rejected')) {

        // access the card 
        const parentNode = event.target.parentNode.parentNode;

        // toggle border &  borderColor 
        parentNode.parentNode.classList.remove('border-l-7', 'border-success');
        parentNode.parentNode.classList.add('border-l-7', 'border-error');

        // access element of card
        const companyName = parentNode.querySelector('.company-name').innerText;
        const style = parentNode.querySelector('.job-style').innerText;
        const typeSalary = parentNode.querySelector('.job-type-salary').innerText;
        const description = parentNode.querySelector('.job-description').innerText;

        const Status = parentNode.querySelector('.job-status');
        // update status
        Status.innerText = 'Rejected';
        Status.classList.remove('border-success', 'bg-green-100', 'text-success');
        Status.classList.add('text-error', 'border', 'border-error', 'bg-red-100', 'rounded-md', 'font-semibold');


        // create object
        const cardInfo = {
            companyName,
            style,
            typeSalary,
            Status: 'Rejected',
            description
        }

        // find the company name inside the interviewList cards 
        const rejectedExist = rejectedList.find(item => item.companyName == cardInfo.companyName);



        // if not match the card the push the card into interviewList
        if (!rejectedExist) {
            rejectedList.push(cardInfo)
        }


        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);


        if (currentStatus == 'btn-filter-interview') {
            renderInterview()
        }

        calculateCount()


    }
})





// create interview card
function renderInterview() {

    filterJobs.innerHTML = '';

    for (let interview of interviewList) {


        const div = document.createElement('div');
        div.className = 'border-success border-l-7 p-6 rounded-b-md shadow-sm flex justify-between';

        div.innerHTML = `
    
                        <div class=" space-y-2 ">
                            <h1 class="company-name text-xl font-bold text-info-content ">${interview.companyName}</h1>
                            <p class="job-style text-lg text-gray-500 mb-2">${interview.style}</p>
                            <p class="job-type-salary text-gray-500 mb-3">${interview.typeSalary}</p>

                            <h4 class="job-status text-lg px-2 py-1 w-30 text-success border border-success bg-green-100 rounded-md font-semibold">${interview.Status}</h4>
                            <p class="job-description text-gray-800">${interview.description}</p>

                            <!-- btn container -->
                            <div class="flex gap-3 mt-4">
                                <button class="btn-interview btn btn-outline btn-accent">Interview</button>
                                <button class="btn-rejected btn btn-outline btn-error">Rejected</button>
                            </div>
                        </div>


                        <!-- right -->
                        <button id="btn-delete"
                            class="  w-7 h-7  rounded-full border border-gray-200 text-gray-500  hover:bg-red-400 hover:text-white ">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>

        `

        filterJobs.appendChild(div)
    }
}


// create rejected card
function renderRejected() {

    filterJobs.innerHTML = '';

    for (let rejected of rejectedList) {


        const div = document.createElement('div');
        div.className = 'border-error border-l-7 p-6 rounded-md shadow-sm flex justify-between';

        div.innerHTML = `
    
                        <div class=" space-y-2 ">
                            <h1 class="company-name text-xl font-bold text-info-content ">${rejected.companyName}</h1>
                            <p class="job-style text-lg text-gray-500 mb-2">${rejected.style}</p>
                            <p class="job-type-salary text-gray-500 mb-3">${rejected.typeSalary}</p>

                            <h4 class="job-status text-lg px-2 py-1 w-30 text-error border border-error bg-red-100 rounded-md font-semibold">${rejected.Status}</h4>
                            <p class="job-description text-gray-800">${rejected.description}</p>

                            <!-- btn container -->
                            <div class="flex gap-3 mt-4">
                                <button class="btn-interview btn btn-outline btn-accent">Interview</button>
                                <button class="btn-rejected btn btn-outline btn-error">Rejected</button>
                            </div>
                        </div>


                        <!-- right -->
                        <button id="btn-delete"
                            class="  w-7 h-7  rounded-full border border-gray-200 text-gray-500  hover:bg-red-400 hover:text-white ">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>

        `

        filterJobs.appendChild(div)
    }
}


  
// set interview section no job available
function interviewEmpty(){

    if (interviewList.length == 0) {
        
        const div = document.createElement('div');
        div.innerHTML = `
        
            <div class="py-15 rounded-md shadow-sm flex flex-col justify-center items-center ">

                    <div class : " w-100 h-100 ">
                        <img  src="./resources/jobs.png" alt="">
                    </div>
                    <h1 class="text-2xl font-bold text-info-content mt-10 mb-2">No jobs available</h1>
                    <p class="text-lg text-gray-500 mb">Check back soon for new job opportunities</p>
                </div>
        
        `
        filterJobs.appendChild(div)
    }
}

// set reject section no job available
function rejectedEmpty(){

    if (rejectedList.length == 0) {
        
        const div = document.createElement('div');
        div.innerHTML = `
        
            <div class="py-15 rounded-md shadow-sm flex flex-col justify-center items-center ">

                    <div class : " w-100 h-100 ">
                        <img  src="./resources/jobs.png" alt="">
                    </div>
                    <h1 class="text-2xl font-bold text-info-content mt-10 mb-2">No jobs available</h1>
                    <p class="text-lg text-gray-500 mb">Check back soon for new job opportunities</p>
                </div>
        
        `        
        filterJobs.appendChild(div)
    }    
}  