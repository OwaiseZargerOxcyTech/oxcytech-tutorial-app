import AddSubtopic from "../../_components/AddSubtopic";
import EditSubtopic from "../../_components/EditSubtopic";

export default function SubtopicPage({ params }) {
  const { subtopicAction } = params;

  return (
    <div>
      {subtopicAction === "addsubtopic" ? (
        <AddSubtopic params={params} />
      ) : (
        <EditSubtopic params={params} />
      )}
    </div>
  );
}
