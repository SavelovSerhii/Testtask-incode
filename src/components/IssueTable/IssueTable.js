import "./IssueTable.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMoving,
  changeSelectedIssue,
  changeRepoList
} from "../../store/actions";

function IssueTable() {
	const dispatch = useDispatch();
  const currentRepo = useSelector(state => state.currentRepo);
  const isMoving = useSelector(state => state.isMoving);
  const selectedIssue = useSelector(state => state.selectedIssue);
  const repoList = useSelector(state => state.repoList);

	const handleMoving = (location) => {
    const updatedRepo = [...repoList[currentRepo]]

    if (location === "ToDo" && !(selectedIssue.state === "open" && !selectedIssue.assignees.length)) {
      updatedRepo[updatedRepo.findIndex(issue => issue.id === selectedIssue.id)] = {...selectedIssue, state: "open", assignees: []}
    } else if (location === "InProgress" && !(selectedIssue.state === "open" && selectedIssue.assignees.length)) {
      if (selectedIssue.assignees.length) {
        updatedRepo[updatedRepo.findIndex(issue => issue.id === selectedIssue.id)] = {...selectedIssue, state: "open"}
      } else {
        updatedRepo[updatedRepo.findIndex(issue => issue.id === selectedIssue.id)] = {...selectedIssue, assignees: ["Anonymous"]}
      }
    } else if (location === "Done" && !(selectedIssue.state === "closed")) {
      if (selectedIssue.assignees.length) {
        updatedRepo[updatedRepo.findIndex(issue => issue.id === selectedIssue.id)] = {...selectedIssue, state: "closed"}
      } else {
        updatedRepo[updatedRepo.findIndex(issue => issue.id === selectedIssue.id)] = {...selectedIssue, state: "closed", assignees: ["Anonymous"]}
      }
    }

    const newRepoList = {...repoList, [currentRepo]: updatedRepo}

    localStorage.setItem('repoList', JSON.stringify(newRepoList));

    dispatch(changeRepoList(newRepoList));
    dispatch(toggleMoving(false));
  }

  return (
		<div className="IssueTable">
      <div className="IssueTable__row">
        <div className="IssueTable__header">
          ToDo
        </div>

        <div className="IssueTable__header">
          In Progress
        </div>

        <div className="IssueTable__header">
          Done
        </div>
      </div>

      <div className="IssueTable__row">
        <div className="IssueTable__container">
          {isMoving && <div className="IssueTable__background" onClick={() => handleMoving("ToDo")}>Drop Here</div>}

          <div className="IssueTable__column">
            {!!currentRepo && !!Object.keys(repoList).length && repoList[currentRepo].map(repo => repo.state === "open" && !repo.assignees.length && (
              <div className="IssueTable__cell" key={repo.id} onClick={() => {dispatch(toggleMoving(true)); dispatch(changeSelectedIssue(repo));}}>
                <span className="IssueTable__text IssueTable__text--title">
                  {repo.title}
                </span>

                <span className="IssueTable__text">
                  #{repo.number} opened 3 days ago
                </span>

                <span className="IssueTable__text">
                  {repo.user.login} | Comments: {repo.comments}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="IssueTable__container">
          {isMoving && <div className="IssueTable__background" onClick={() => handleMoving("InProgress")}>Drop Here</div>}

          <div className="IssueTable__column">
            {!!currentRepo && !!Object.keys(repoList).length && repoList[currentRepo].map(repo => (repo.state === "open" && repo.assignees.length && (
              <div className="IssueTable__cell" key={repo.id} onClick={() => {dispatch(toggleMoving(true)); dispatch(changeSelectedIssue(repo));}}>
                <span className="IssueTable__text IssueTable__text--title">
                  {repo.title}
                </span>

                <span className="IssueTable__text">
                  #{repo.number} opened 3 days ago
                </span>

                <span className="IssueTable__text">
                  {repo.user.login} | Comments: {repo.comments}
                </span>
              </div>
            )) || false)}
          </div>
        </div>

        <div className="IssueTable__container">
          {isMoving && <div className="IssueTable__background" onClick={() => handleMoving("Done")}>Drop Here</div>}

          <div className="IssueTable__column">
            {!!currentRepo && !!Object.keys(repoList).length && repoList[currentRepo].map(repo => repo.state === "closed" && (
              <div className="IssueTable__cell" key={repo.id} onClick={() => {dispatch(toggleMoving(true)); dispatch(changeSelectedIssue(repo));}}>
                <span className="IssueTable__text IssueTable__text--title">
                  {repo.title}
                </span>

                <span className="IssueTable__text">
                  #{repo.number} opened 3 days ago
                </span>

                <span className="IssueTable__text">
                  {repo.user.login} | Comments: {repo.comments}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
	)
}

export default IssueTable;