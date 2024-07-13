function deleteJob(id) {
    const result = confirm("Are you sure you want to delete ?");
  
    if (result) {
      fetch("/delete/" + id, {
        method: "POST",
      }).then((res) => {
        if (res.redirected) {
          window.location.href = "/jobs";
        }
      });
    }
  }