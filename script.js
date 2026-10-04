let applications =
    JSON.parse(localStorage.getItem("jobApplications")) || [

    {
        company: "Google",
        role: "Software Developer",
        location: "Bangalore",
        date: "2026-09-15",
        type: "Full Time",
        status: "Applied"
    },

    {
        company: "Microsoft",
        role: "Frontend Developer",
        location: "Hyderabad",
        date: "2026-09-10",
        type: "Internship",
        status: "Interview"
    },

    {
        company: "Infosys",
        role: "Cloud Engineer",
        location: "Chennai",
        date: "2026-08-28",
        type: "Full Time",
        status: "Selected"
    },

    {
        company: "TCS",
        role: "Web Developer",
        location: "Chennai",
        date: "2026-08-20",
        type: "Full Time",
        status: "Rejected"
    }
];


const form = document.getElementById("applicationForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const application = {

        company:
            document.getElementById("company").value,

        role:
            document.getElementById("role").value,

        location:
            document.getElementById("location").value,

        date:
            document.getElementById("applicationDate").value,

        type:
            document.getElementById("jobType").value,

        status:
            document.getElementById("status").value
    };

    applications.push(application);

    saveApplications();

    form.reset();

    displayApplications();

    alert("Job application added successfully!");

    document
        .getElementById("applications")
        .scrollIntoView({ behavior: "smooth" });
});


function saveApplications() {

    localStorage.setItem(
        "jobApplications",
        JSON.stringify(applications)
    );
}


function displayApplications() {

    const table =
        document.getElementById("applicationTable");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filter =
        document.getElementById("filterStatus").value;

    table.innerHTML = "";


    const filteredApplications =
        applications.filter(application => {

            const matchesSearch =
                application.company
                    .toLowerCase()
                    .includes(search) ||

                application.role
                    .toLowerCase()
                    .includes(search) ||

                application.location
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                filter === "All" ||
                application.status === filter;


            return matchesSearch && matchesStatus;
        });


    filteredApplications.forEach(application => {

        const originalIndex =
            applications.indexOf(application);


        let statusClass = "applied";


        if (application.status === "Interview") {
            statusClass = "interview";
        }

        if (application.status === "Selected") {
            statusClass = "selected";
        }

        if (application.status === "Rejected") {
            statusClass = "rejected";
        }


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${application.company}</td>

            <td>${application.role}</td>

            <td>${application.location}</td>

            <td>${application.date}</td>

            <td>${application.type}</td>

            <td>
                <span class="status ${statusClass}">
                    ${application.status}
                </span>
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteApplication(${originalIndex})"
                >
                    Delete
                </button>
            </td>

        `;


        table.appendChild(row);
    });


    updateStats();
}


function deleteApplication(index) {

    if (
        confirm(
            "Are you sure you want to delete this application?"
        )
    ) {

        applications.splice(index, 1);

        saveApplications();

        displayApplications();
    }
}


function updateStats() {

    document.getElementById("totalApplications")
        .innerText = applications.length;


    document.getElementById("interviewApplications")
        .innerText =
        applications.filter(
            application =>
                application.status === "Interview"
        ).length;


    document.getElementById("selectedApplications")
        .innerText =
        applications.filter(
            application =>
                application.status === "Selected"
        ).length;


    document.getElementById("rejectedApplications")
        .innerText =
        applications.filter(
            application =>
                application.status === "Rejected"
        ).length;
}


displayApplications();