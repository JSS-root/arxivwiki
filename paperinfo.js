(async() => {
    if (window.location.pathname.indexOf(("/abs/")) !== -1) {
        document.getElementById("paper_info").style.display = "";

        const id = window.location.pathname.split('/abs/')[1];
        const response = await fetch('https://export.arxiv.org/api/query?id_list=' + id);
        const data = await response.text();
        title = data.split("<title>")[1].split("</title>")[0].replace(/\n/g, ' ').replace(/ +/g, ' ');
        document.getElementById("paper_title").innerText = title;

        abstract = data.split("<summary>")[1].split("</summary>")[0].replace(/\n/g, ' ').replace(/ +/g, ' ')
        document.getElementById("paper_abstract").innerText = abstract;

        authors = data.substring(data.indexOf("<author>"), data.lastIndexOf("</author>"))
            .replace(/<arxiv:affiliation[^<]*<\/arxiv:affiliation>/g, '')
            .replace(/<\/?author>/g, '').replace(/\n/g, ' ').replace(/ +/g, ' ')
            .replace(/<\/name> <name>/g, ', ').replace(/<\/?name>/g, '')
        document.getElementById("paper_authors").innerText = authors;

        details = `<a href="https://arxiv.org/abs/${id}" target="_blank">https://arxiv.org/abs/${id}</p>`;
        document.getElementById("paper_details").innerHTML = details;

        // add newlines to make the box the same size
        newlines = "%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A%0A";
        document.getElementsByTagName("iframe")[0].src = "https://scitldr.apps.allenai.org/?q=" + encodeURIComponent(abstract) + newlines;
        document.getElementById("summarizer").style.display = ""
    }
})()