import ray
import time
import socket

ray.init(address="auto")

@ray.remote
def heavy_compute(x):
    # pretend to do work
    time.sleep(2)
    return (socket.gethostname(), x * x)

tasks = [heavy_compute.remote(i) for i in range(8)]
results = ray.get(tasks)

print("\n=== Distributed Computation Results ===")
for host, value in results:
    print(f"From {host}: {value}")

print("\nCluster resources:")
print(ray.cluster_resources())
