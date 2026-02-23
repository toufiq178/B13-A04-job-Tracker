let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

// let allList = []


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



//  tracker count calculation
function calculateCount() {
    // total card length

    const totalCard = jobAllCard.children.length;

    // total and jobs count
    totalCount.innerText = totalCard;

    // interview count
    interviewCount.innerText = interviewList.length;

    // rejected count
    rejectedCount.innerText = rejectedList.length;

}
calculateCount()


// allJobCountSet
function allJobCountSet() {
    jobCount.innerHTML = `${jobAllCard.children.length} jobs`;
}
allJobCountSet()


// interviewJobCountSet
function interviewJobCountSet() {
    const interviewListCount = interviewList.length;
    jobCount.innerHTML = `${interviewListCount} of ${jobAllCard.children.length} jobs`;
}
// rejectJobCountSet
function rejectedJobCountSet() {
    const rejectedListCount = rejectedList.length;
    jobCount.innerHTML = `${rejectedListCount} of ${jobAllCard.children.length} jobs`;
}



// toggle start
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

        interviewJobCountSet();


    } else if (id == 'btn-filter-all') {
        jobAllCard.classList.remove('hidden');
        filterJobs.classList.add('hidden');

        // jobCount.innerHTML = `${jobAllCard.children.length} jobs`;
        allJobCountSet();



    } else if (id == 'btn-filter-rejected') {
        jobAllCard.classList.add('hidden');
        filterJobs.classList.remove('hidden');

        renderRejected();
        rejectedEmpty();

        rejectedJobCountSet();

    }
}



// btn click function  interview / rejected / delete
mainContainer.addEventListener('click', function (event) {

    // console.log(event.target.closest('.btn-delete'));

    // if click delete btn
    if (event.target.closest('.btn-delete')) {

        const job = event.target.closest('.job-card');
        const companyName = job.querySelector('.company-name').innerText;
        console.log(companyName);


        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        job.remove();


        if (currentStatus == 'btn-filter-interview') {
            renderInterview();
            interviewEmpty()
            interviewJobCountSet();
        }

        if (currentStatus == 'btn-filter-rejected') {
            renderRejected();
            rejectedJobCountSet()
            rejectedEmpty()
        }

        if (currentStatus == 'btn-filter-all' || currentStatus == 'all') {

            allJobCountSet();
        }

        UpdateAllJobs(companyName, 'NotApplied');
        calculateCount();

        return;
    }

    // if click interview btn
    if (event.target.classList.contains('btn-interview')) {

        // access the card 
        const parentNode = event.target.parentNode.parentNode;

        // toggle border &  borderColor 
        parentNode.parentNode.classList.remove('border-l-7', 'border-error');
        parentNode.parentNode.classList.add('border-l-7', 'border-success');

        // access element of card
        const companyName = parentNode.querySelector('.company-name').innerText;
        const style = parentNode.querySelector('.job-style').innerText;
        const type = parentNode.querySelector('.job-type').innerText;
        const salary = parentNode.querySelector('.job-salary').innerText;
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
            type,
            salary,
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
            renderRejected();
            rejectedEmpty();
            rejectedJobCountSet()
        }


        UpdateAllJobs(companyName, 'Interview');
        calculateCount()






        // if click rejected btn
    } else if (event.target.classList.contains('btn-rejected')) {

        // access the card 
        const parentNode = event.target.parentNode.parentNode;

        // toggle border &  borderColor 
        parentNode.parentNode.classList.remove('border-l-7', 'border-success');
        parentNode.parentNode.classList.add('border-l-7', 'border-error');

        // access element of card
        const companyName = parentNode.querySelector('.company-name').innerText;
        const style = parentNode.querySelector('.job-style').innerText;
        const type = parentNode.querySelector('.job-type').innerText;
        const salary = parentNode.querySelector('.job-salary').innerText;
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
            type,
            salary,
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
            renderInterview();
            interviewEmpty();
            interviewJobCountSet();

        }

        UpdateAllJobs(companyName, 'Rejected');
        calculateCount()




    }


})




// create interview card
function renderInterview() {

    filterJobs.innerHTML = '';

    for (let interview of interviewList) {


        const div = document.createElement('div');
        div.className = 'job-card border-success border-l-7 p-6 rounded-b-md shadow-sm flex justify-between';

        div.innerHTML = `
    
                        <div class=" space-y-2 ">
                            <h1 class="company-name text-xl font-bold text-info-content ">${interview.companyName}</h1>
                            <p class="job-style text-lg text-gray-500 mb-2">${interview.style}</p>
                            <div class="text-gray-500 mb-3">
                                <span class="job-type">${interview.type}</span>
                                <span class="job-salary">${interview.salary}</span>
                            </div>

                            <h4 class="job-status text-lg px-2 py-1 w-30 text-success border border-success bg-green-100 rounded-md font-semibold">${interview.Status}</h4>
                            <p class="job-description text-gray-800">${interview.description}</p>

                            <!-- btn container -->
                            <div class="flex gap-3 mt-4">
                                <button class="btn-interview btn btn-outline btn-accent">Interview</button>
                                <button class="btn-rejected btn btn-outline btn-error">Rejected</button>
                            </div>
                        </div>


                        <!-- right -->
                        <button 
                            class="btn-delete  w-7 h-7 cursor-pointer rounded-full border border-gray-200 text-gray-500  hover:bg-red-400 hover:text-white ">
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
        div.className = ' job-card border-error border-l-7 p-6 rounded-md shadow-sm flex justify-between';

        div.innerHTML = `
    
                        <div class=" space-y-2 ">
                            <h1 class="company-name text-xl font-bold text-info-content ">${rejected.companyName}</h1>
                            <p class="job-style text-lg text-gray-500 mb-2">${rejected.style}</p>
                            <div class="text-gray-500 mb-3">
                                <span class="job-type">${rejected.type}</span>
                                <span class="job-salary">${rejected.salary}</span>
                            </div>

                            <h4 class="job-status text-lg px-2 py-1 w-30 text-error border border-error bg-red-100 rounded-md font-semibold">${rejected.Status}</h4>
                            <p class="job-description text-gray-800">${rejected.description}</p>

                            <!-- btn container -->
                            <div class="flex gap-3 mt-4">
                                <button class="btn-interview btn btn-outline btn-accent">Interview</button>
                                <button class="btn-rejected btn btn-outline btn-error">Rejected</button>
                            </div>
                        </div>


                        <!-- right -->
                        <button 
                            class="btn-delete  w-7 h-7 cursor-pointer rounded-full border border-gray-200 text-gray-500  hover:bg-red-400 hover:text-white ">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>

        `

        filterJobs.appendChild(div)
    }
}



// set interview section no job available
function interviewEmpty() {

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
function rejectedEmpty() {

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


// updating toggling time status 
function UpdateAllJobs(companyName, status) {

    // 
    const jobCards = jobAllCard.querySelectorAll('.job-card');

    for (const jobCard of jobCards) {

        // console.log(jobCard);
        const jobName = jobCard.querySelector('.company-name').innerText;

        // console.log(jobName);

        if (jobName == companyName) {

            console.log(jobName);

            const currentStatus = jobCard.querySelector('.job-status');

            currentStatus.classList.remove('text-success', 'border-success', 'bg-green-100',
                'text-error', 'border-error', 'bg-red-100');
            jobCard.classList.remove('border-success', 'border-error')

            if (status == 'Interview') {

                currentStatus.innerText = 'Interview';
                currentStatus.classList.add('text-success', 'border-success', 'bg-green-100');
                jobCard.classList.add('border-success', 'border-l-7')


            } else if (status == 'Rejected') {

                currentStatus.innerText = 'Rejected';
                currentStatus.classList.add('text-error', 'border-error', 'bg-red-100');
                jobCard.classList.add('border-error', 'border-l-7')

            } else if (status == 'NotApplied') {

                currentStatus.innerText = 'Not Applied';
                currentStatus.classList.remove('text-success', 'border-success', 'bg-green-100', 'text-error', 'border-error', 'bg-red-100', 'font-semibold', 'border');
                jobCard.classList.remove('border-success', 'border-error', 'border-l-7')
            }


        }


    }
}


