import "./RepoForm.css";
import { Octokit } from "octokit";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseRepo,
  toggleError,
  changeUrl,
  changeStargazers,
  changeRepoList
} from "../../store/actions";

function RepoForm() {
	const dispatch = useDispatch();
  const currentRepo = useSelector(state => state.currentRepo);
  const isError = useSelector(state => state.isError);
  const url = useSelector(state => state.url);
  const stargazersList = useSelector(state => state.stargazersList);
  const repoList = useSelector(state => state.repoList);

	const handleSubmit = async (event) => {
    event.preventDefault();

    const repository = url.slice(19).split("/");
    const octokit = new Octokit({});

    if (!Object.keys(repoList).includes(repository.join("/"))) {
      await octokit.request("GET /repos/{owner}/{repo}/issues", {
        owner: repository[0],
        repo: repository[1]
      }).then((response) => {
        const newRepoList = {...repoList, [repository.join("/")]: response.data}

        localStorage.setItem('repoList', JSON.stringify(newRepoList));
        localStorage.setItem('currentRepo', currentRepo);

        dispatch(changeRepoList(newRepoList));
        dispatch(chooseRepo(repository.join("/")));
      }).catch(() => {
        dispatch(toggleError(true));
      })
    } else {
      await octokit.request("GET /repos/{owner}/{repo}", {
        owner: repository[0],
        repo: repository[1]
      }).then((response) => {
        const newStargazers = {...stargazersList, [repository.join("/")]: response.data.stargazers_count}

        localStorage.setItem('currentRepo', currentRepo);

        dispatch(changeStargazers(newStargazers));
        dispatch(chooseRepo(repository.join("/")));
      }).catch(() => {
        dispatch(toggleError(true));
      })
    }
  }

  return (
		<form
			className="RepoForm__form"
			onSubmit={event => {handleSubmit(event)}}
		>
			<input
				className="RepoForm__input RepoForm__input--text"
				type="text"
				placeholder="Enter repo URL"
				value={url}
				onChange={(event) => {
					if (isError) {
						dispatch(toggleError(false));
						dispatch(changeUrl(event.target.value));
					} else {
						dispatch(changeUrl(event.target.value));
					}
				}}
			/>

			<input className="RepoForm__input RepoForm__input--submit" type="submit" value="Load issues" />
		</form>
	)
}

export default RepoForm;