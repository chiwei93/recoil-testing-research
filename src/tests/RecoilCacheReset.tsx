import { useEffect } from "react";
import {
  type RecoilValue,
  useRecoilRefresher_UNSTABLE,
  useRecoilSnapshot,
} from "recoil";

const RecoilCacheResetEntry = ({ node }: { node: RecoilValue<unknown> }) => {
  const resetNode = useRecoilRefresher_UNSTABLE(node);
  useEffect(
    () => () => {
      resetNode();
    },
    [resetNode]
  );
  return null;
};

export function RecoilCacheReset() {
  const snapshot = useRecoilSnapshot();
  return (
    <>
      {[...snapshot.getNodes_UNSTABLE()].map((node) => (
        <RecoilCacheResetEntry key={node.key} node={node} />
      ))}
    </>
  );
}
