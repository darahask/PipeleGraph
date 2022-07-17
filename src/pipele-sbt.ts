import { BigInt } from "@graphprotocol/graph-ts";
import {
  PipeleSBT,
  ApprovalForAll,
  Attest,
  Revoke,
  TransferBatch,
  TransferSingle,
  URI,
} from "../generated/PipeleSBT/PipeleSBT";
import { PipeleEntity } from "../generated/schema";

export function handleAttest(event: Attest): void {
  let entity = PipeleEntity.load(event.params.tokenId.toString());
  if (entity === null) {
    entity = new PipeleEntity(event.params.tokenId.toString());
  }
  entity.cid = event.params.cid.toString();
  if (event.params.ownershipType.toString() == "1") {
    entity.owner = event.params.to.toHexString();
    entity.shared = [];
  } else {
    let shared = entity.shared;
    entity.shared = shared.concat([event.params.to.toHexString()]);
  }
  entity.save();
}

export function handleRevoke(event: Revoke): void {
  let entity = PipeleEntity.load(event.params.tokenId.toString());
  if (entity === null) {
    entity = new PipeleEntity(event.params.tokenId.toString());
  }

  if (event.params.to.toHexString() == entity.owner) {
    entity.owner = "";
  } else {
    let shared = entity.shared;
    let index = shared.indexOf(event.params.to.toHexString());
    if (index > -1) {
      shared.splice(index, 1);
    }
    entity.shared = shared;
  }

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}
